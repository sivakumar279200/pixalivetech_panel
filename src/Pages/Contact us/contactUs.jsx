import React, { useState, useEffect } from "react";
import { deleteContactMessage, getContactMessages } from "../../Api/contactUs";
import { getAdmin } from "../../Utils/storage";
import { toast } from "react-toastify";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await getContactMessages({ userId: getAdmin() });
      setContacts(res?.data?.result?.userList || []);
    } catch (error) {
      toast.error("Error fetching contacts");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContactMessage(deleteId);
      toast.success("Contact deleted successfully");
      setShowDeleteModal(false);
      fetchContacts();
    } catch (error) {
      toast.error("Error deleting contact");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-purple-600 mb-4">Contact List</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((contact, index) => (
                  <tr key={contact._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{contact.name}</td>
                    <td className="p-3">{contact.email}</td>
                    <td className="p-3">{contact.mobileNumber}</td>
                    <td className="p-3">{contact.subject}</td>
                    <td className="p-3">{contact.messages}</td>
                    <td className="p-3 text-center flex justify-center gap-4">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowViewModal(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => {
                          setDeleteId(contact._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* View Contact Modal */}
        {showViewModal && selectedContact && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">Contact Details</h2>
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedContact.mobileNumber}
              </p>
              <p>
                <strong>Subject:</strong> {selectedContact.subject}
              </p>
              <p>
                <strong>Message:</strong> {selectedContact.messages}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">
                Are you sure you want to delete this contact?
              </h2>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
