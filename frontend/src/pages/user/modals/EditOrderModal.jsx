import { useEffect, useState } from "react";

export default function EditOrderModal ({isOpen,onClose,rowData,onSave}){
    const [message,setMessage] = useState('');
    const closeModal = () => {
        setMessage('');
        onClose();
    }
    const [status,setStatus] = useState(rowData.status)
    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/pos/${rowData.po_number}/update_status`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({status})
            })
            const data = await response.json()
            setMessage(data.message)
            onSave()
            setMessage('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{rowData.po_number}</h3>
                            <div className="mt-2">
                                <div className="mb-2">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Delivery Date</label>
                                    <p id="quantity" className="mt-1 text-sm text-gray-900">{rowData.delivery_date}</p>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="items" className="block text-sm font-medium text-gray-700">Items</label>
                                    {Object.entries(JSON.parse(rowData.items)).map(([key,value])=>(
                                        <p key={key}><strong>{key}</strong>:{value}</p>
                                    ))}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <p id="quantity" className="mt-1 text-sm text-gray-900">{rowData.quantity}</p>
                                </div>
                                {rowData.status === 'pending' && (<div className="mb-2">
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                    id="status"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={status}
                                    onChange={handleStatusChange}
                                    >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>)}
                                {message && (<div className="text-green-500 text-sm">{message}</div>)}
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {rowData.status === 'pending' && (<button
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleSave}
                            >
                            Save
                            </button>)}
                            <button
                                onClick={closeModal}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                            Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

