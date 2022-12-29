import React, { useState } from 'react';
import './App.css';

// Import the default export from the database module and access the named exports as properties
import db from './database';
const { addExpense, getExpenses, updateExpense, deleteExpense } = db;

function App() {
  // Declare state variables to store the list of expenses and any form data
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({});
  const [formVisible, setFormVisible] = useState(false);

  // Fetch the expenses from the local storage when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      const expenses = await getExpenses();
      setExpenses(expenses);
    };
    fetchData();
  }, []);

  // Add a new expense to the list and save it to the local storage
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate the form data and show an error if necessary
    if (!formData.sum || !formData.category || !formData.description) {
      // Show error message
      return;
    }
    // Add the expense to the list and save it to the local storage
    const expense = { ...formData, date: new Date() };
    setExpenses([...expenses, expense]);
    await addExpense(expense);
    // Reset the form data
    setFormData({});
  };

  // Update an expense in the list and save the changes to the local storage
  const handleUpdate = async (expense) => {
    // Show the update form for the selected expense
    setFormData(expense);
    setFormVisible(true);
  };

  // Save the updated expense to the local storage and reset the form data
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    // Validate the form data and show an error if necessary
    if (!formData.sum || !formData.category || !formData.description) {
      // Show error message
      return;
    }
    // Update the expense in the list and save the changes to the local storage
    const updatedExpense = { ...formData };
    setExpenses(
      expenses.map((expense) => (expense.id ===
        updatedExpense.id ? updatedExpense : expense))
        );
        await updateExpense(updatedExpense);
        // Reset the form data and hide the form
        setFormData({});
        setFormVisible(false);
      };
    
      // Delete an expense from the list and the local storage
      const handleDelete = async (expense) => {
        // Confirm the delete action
        if (window.confirm('Are you sure you want to delete this expense?')) {
          // Remove the expense from the list and the local storage
          setExpenses(expenses.filter((e) => e.id !== expense.id));
          await deleteExpense(expense);
        }
      };
    
      // Update the form data state when the input values change
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      return (
        <div className="App">
          <h1>Expense Tracker</h1>
          {formVisible ? (
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Sum:
                <input
                  type="number"
                  name="sum"
                  value={formData.sum}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Update Expense</button>
          <button onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Sum:
            <input
              type="number"
              name="sum"
              value={formData.sum}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Add Expense</button>
        </form>
      )}
      <h2>Expenses</h2>
      {expenses.length === 0 && <p>No expenses have been added yet.</p>}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <p>
              {expense.sum} - {expense.category} - {expense.description}
            </p>
            <button onClick={() => handleUpdate(expense)}>Update</button>
            <button onClick={() => handleDelete(expense)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// dsa
    