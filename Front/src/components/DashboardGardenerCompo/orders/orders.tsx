import { useState } from "react";
import ModalDetails from "./modal";



const OrderList = ({ order }: any) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenModal = (order: any) => {
        setSelectedOrder(order); // Almacena la orden seleccionada para mostrar en el modal
    };

    const handleCloseModal = () => {
        setSelectedOrder(null); // Cierra el modal
    };
    console.log(order);
    
    return (
        <div className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {order.map((orderItem: any) => (
                    <div
                        key={orderItem.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:rotate-2"
                    >
                        <div className="relative">
                            <img
                                src={orderItem.user.profileImageUrl || "https://via.placeholder.com/400x250"}
                                alt="Imagen de ejemplo"
                                className="w-full h-56 object-cover rounded-t-2xl"
                            />
                            <div className="absolute top-4 left-4 bg-white bg-opacity-70 px-3 py-1 text-gray-800 text-sm font-semibold rounded-full">
                                {orderItem.user.name}
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    <strong>Fecha de la solicitud:</strong> {orderItem.date.toString().slice(0, 10)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Servicios Solicitado:</strong>
                                </p>
                                <ul>
                                    {orderItem.serviceProvided.map((service: any, index: number) => {
                                        return (

                                            <li key={index}>- {service.detailService}</li>

                                        );
                                    })}
                                </ul>

                                <p className="text-sm text-gray-500">
                                    <strong>Solicitante:</strong> {orderItem.user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Estado de la solicitud:</strong>{" "}
                                    {orderItem.isApproved ? "Aprobada" : "Pendiente"}
                                </p>
                            </div>
                            {orderItem.isApproved && (
                                <button
                                    onClick={() => handleOpenModal(orderItem)}
                                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                                >
                                    Ver detalles
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <ModalDetails order={selectedOrder} onClose={handleCloseModal} />
        </div>
    );
};

export default OrderList;
