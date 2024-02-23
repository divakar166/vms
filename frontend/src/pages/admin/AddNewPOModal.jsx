import { useState } from "react";
import {
  PlusIcon,
} from '@heroicons/react/24/outline';

const AddNewPOModal = ({isOpen,onClose}) => {
  const [addPOStatus,setAddPOStatus] =useState('');
  const [formData,setFormData] = useState({
    vendorCode:'0',
    delivery_date:'',
    items:'',
    quantity:''
  })
  const [errors,setErrors] = useState({});
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };
  const validateForm = () => {
    let errors = {};
    if (formData.vendorCode === '0') {
      errors.vendorCode = 'Please select a vendor';
    }
    if (!formData.delivery_date) {
      errors.delivery_date = 'Delivery Date is required';
    }
    if (!formData.items) {
      errors.items = 'Items are required';
    }
    if (!formData.quantity) {
      errors.quantity = 'Quantity is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  const handleSave = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/pos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setAddPOStatus('PO Added Successfully!')
          window.location.reload();
          closeModal();
        } else {
          console.error('Failed to add PO');
        }
      } catch (error) {
        console.error('Error adding PO:', error);
      }
    }
  };
  const closeModal = () => {
    onClose();
    setFormData({
      po: '',
      vendorCode: '0',
      delivery_date: '',
      items: '',
      quantity: ''
    });
    setErrors({});
  };
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); 
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
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
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Purchase Order</h3>
                <form onSubmit={handleSave}>
                  <div className="mt-2">
                    <div className="mb-2">
                      <label htmlFor="vendor">Assign to : </label>
                      <select name="vendorCode" id="vendorCode" value={formData.vendor} onChange={handleInputChange}>
                        <option value="0">Select Vendor</option>
                        <option value="VN001">VN001</option>
                        <option value="VN002">VN002</option>
                        <option value="VN003">VN003</option>
                      </select>
                      {errors.vendor && <p className="text-red-500">{errors.vendor}</p>}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="delivery_date">Delivery Date: </label>
                      <input type="date" name="delivery_date" id="delivery_date" value={formData.delivery_date} onChange={handleInputChange} min={getMinDate()} />
                      {errors.delivery_date && <p className="text-red-500">{errors.delivery_date}</p>}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="items">Items: </label>
                      <input type="text" name='items' className='border-[1px] rounded-md border-black pl-1' value={formData.items} onChange={handleInputChange} />
                      {errors.items && <p className="text-red-500">{errors.items}</p>}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="quantity">Quantity: </label>
                      <input type="text" name='quantity' className='border-[1px] rounded-md border-black pl-1' value={formData.quantity} onChange={handleInputChange} />
                      {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                    </div>
                  </div>
                  {addPOStatus && (<div className='text-green-500 text-md'>{addPOStatus}</div>)}
                  <div className="sm:flex sm:flex-row-reverse">
                    <input type="submit" value="Add PO" className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer' />
                    <button
                      onClick={closeModal}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewPOModal;