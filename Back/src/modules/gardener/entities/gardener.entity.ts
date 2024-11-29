import { ReviewsEntity } from 'src/modules/reviews/entities/reviews.entity';
import { ServiceDetail } from 'src/modules/service-details/entities/service-detail.entity';
import { ServiceProvided } from 'src/modules/serviceProvided/entities/serviceProvided.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/user/enums/role.enum';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({
  name: 'Gardener',
})
export class Gardener extends User {
  @Column({ type: 'text', nullable: true })
  experience: string; // Años de experiencia o descripción breve

  @Column({ type: 'int', nullable: true })
  calification: number; // Calificación promedio basada en servicios  


  @Column({ nullable: true })
  ubication: string; //REVISAR QUE TIPO DE DATO DEVUELVE GOOGLE MAPS PARA LA UBI

  // @Column({ type: 'float', nullable: true })
  // costPerHour: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Gardener,
  })
  role: Role;

  @Column({ type: 'text', array: true, nullable: true })
  reservedDays: string[] | null;

  @ManyToMany(() => ServiceProvided, (service) => service.gardener)
  serviceProvided: ServiceProvided[];

  @ManyToMany(() => ReviewsEntity, (review) => review.gardener)
  @JoinTable()
  reviews: ReviewsEntity[];

  @OneToMany(
    () => ServiceDetail,
    (serviceDetail) => serviceDetail.assignedGardener,
  )
  serviceDetails: ServiceDetail[];

  @Column(
    {
      type: 'simple-array',
      nullable: true,
    }
  )
  carrouselImages: string[];
}
