import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGardenerDto } from './dto/create-gardener.dto';
import { UpdateGardenerDto } from './dto/update-gardener.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gardener } from './entities/gardener.entity';
import { Repository } from 'typeorm';
import { format, parse } from 'date-fns';

@Injectable()
export class GardenerService {
  constructor(
    @InjectRepository(Gardener)
    private readonly gardenerRepository: Repository<Gardener>,
  ) { }

  async reserveDay(id: string, day: string): Promise<{ message: string }> {
    try {
      const gardener = await this.gardenerRepository.findOne({ where: { id } });

      if (!gardener) {
        throw new Error('Jardinero no encontrado');
      }

      if (!gardener.reservedDays) {
        gardener.reservedDays = [];
      }

      // Convertir el día (string en formato 'YYYY-MM-DD') a un objeto Date
      const parsedDate = new Date(day);

      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('El formato de fecha es inválido. Debe ser YYYY-MM-DD.');
      }

      // Verificar si el día ya está reservado
      const isReserved = gardener.reservedDays.some(
        (reservedDay) =>
          reservedDay.toISOString().split('T')[0] === parsedDate.toISOString().split('T')[0],
      );

      if (isReserved) {
        throw new BadRequestException('El día ya está reservado');
      }

      gardener.reservedDays.push(parsedDate);
      await this.gardenerRepository.save(gardener);

      return { message: `Día ${day} reservado correctamente para el jardinero con ID ${id}` };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Ocurrió un error interno al intentar reservar el día: ${error}`,
      );
    }
  }

  async getReservedDays(id: string): Promise<string[]> {
    const gardener = await this.gardenerRepository.findOne({ where: { id } });

    if (!gardener) {
      throw new Error('Jardinero no encontrado');
    }

    // Formatear las fechas a 'YYYY-MM-DD'
    return gardener.reservedDays.map((day) =>
      format(day, 'yyyy-MM-dd') // Alternativa: day.toISOString().split('T')[0]
    );
  }


  async create(createGardenerDto: CreateGardenerDto): Promise<Gardener> {
    const gardner = this.gardenerRepository.create(createGardenerDto);
    return await this.gardenerRepository.save(gardner);
  }

  async findAll(
    page: number,
    limit: number,
    name?: string,
    calification?: number,
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: Gardener[]; count: number }> {
    const skip = (page - 1) * limit;

    const query = this.gardenerRepository
      .createQueryBuilder('gardener')
      .leftJoinAndSelect('gardener.serviceProvided', 'serviceProvided')
      .leftJoinAndSelect('gardener.serviceDetails', 'serviceDetails')
      .take(limit)
      .skip(skip)
      .orderBy('gardener.name', order);

    // Filtro por nombre
    if (name) {
      query.andWhere('gardener.name ILIKE :name', { name: `%${name}%` });
    }

    // Filtro por calificación
    if (calification !== undefined) {
      query.andWhere('gardener.calification = :calification', { calification });
    }

    const [data, count] = await query.getManyAndCount();

    if (count === 0) {
      throw new NotFoundException('Gardener not found');
    }

    return { count, data };
  }

  async findOne(id: string): Promise<Gardener> {
    const gardner = await this.gardenerRepository.findOneBy({ id });
    if (!gardner) {
      throw new NotFoundException(`Gardener with the ID ${id} not Found`);
    }
    return gardner;
  }
  findByEmail(email: string) {
    try {
      const gardener = this.gardenerRepository.findOne({ where: { email } });
      return gardener;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async update(
    id: string,
    updateGardenerDto: UpdateGardenerDto,
  ): Promise<Gardener> {
    const gardener = await this.gardenerRepository.findOneBy({ id });
    if (!gardener) {
      throw new NotFoundException(`Gardener with the ID ${id} not Found`);
    }
    await this.gardenerRepository.update(id, updateGardenerDto);
    return this.gardenerRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<string | void> {
    const result = await this.gardenerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gardener with the ID ${id} not Found`);
    }

    return `Gardner with the ID ${id} DELETED exitosly`;
  }

  async updateProfileImage(id: string, imageUrl: string): Promise<void> {
    await this.gardenerRepository.update(id, { profileImageUrl: imageUrl });
  }

  // Método para buscar gardeners por servicio
  async findByService(serviceId: string): Promise<Gardener[]> {
    return this.gardenerRepository
      .createQueryBuilder('gardener')
      .leftJoinAndSelect('gardener.services', 'service')
      .where('service.id = :serviceId', { serviceId })
      .getMany();
  }

  async findServicesProvidedByGardener(id: string) {
    const gardener = await this.gardenerRepository.findOne({
      where: { id: id },
      relations: ['serviceProvided'],
    })

    if (!gardener) {
      throw new NotFoundException(`Jardinero ${id} no encontrado`);
    }

    return gardener.serviceProvided;

  }

  async uploadCarrouselImages(id: string, imageUrl: string): Promise<void> {
    // Obtén el jardinero actual por su ID
    const gardener = await this.gardenerRepository.findOne({ where: { id } });

    if (!gardener) {
      throw new Error("Gardener not found");
    }

    // Asegúrate de que carrouselImages sea un array
    const currentImages = gardener.carrouselImages || [];

    // Agrega la nueva URL al array
    const updatedImages = [...currentImages, imageUrl];

    // Actualiza la entidad con el nuevo array
    await this.gardenerRepository.update(id, { carrouselImages: updatedImages });
  }

  async findOrdersAsignedForGardener(id: string) {
    const gardener = await this.gardenerRepository.findOne({
      where: { id: id },
      relations: ['serviceDetails'],
    })

    if (!gardener) {
      throw new NotFoundException(`Jardinero ${id} no encontrado`);
    }

    return gardener.serviceDetails;

  }
}
