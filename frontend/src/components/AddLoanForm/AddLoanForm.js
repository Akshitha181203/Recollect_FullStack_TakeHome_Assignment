import React, { useState } from "react";
import "./AddLoanForm.css";
import { FaTimes } from "react-icons/fa";

const AddLoanForm = ({ onClose, onSubmit, loan }) => {
    const [loanType, setLoanType] = useState(loan?.type || "");
    const [borrower, setBorrower] = useState(loan?.borrower || "");
    const [address, setAddress] = useState(loan?.address || "");
    const [coName, setCoName] = useState(loan?.coName || "");
    const [coAddress, setCoAddress] = useState(loan?.coAddress || "");
    const [dpd, setDpd] = useState(loan?.dpd || "");
    const [amount, setAmount] = useState(loan?.amount || "");
    const [region, setRegion] = useState(loan?.region || "");
    const [status, setStatus] = useState(loan?.status || "");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedLoan = {
        type: loanType,
        borrower,
        address,
        coName,
        coAddress,
        dpd,
        amount,
        region,
        status,
      };
      onSubmit(updatedLoan, loan?.id);
      onClose();
    };  
  
  return (
    <div className="upload-modal-backdrop">
      <div className="upload-drawer">
        <div className="upload-header">
          <h3>Add New Loan</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <label>Loan Type:</label>
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option>Home Loan</option>
            <option>Car Loan</option>
            <option>Personal Loan</option>
          </select>

          <label>Borrower Name:</label>
          <input
            type="text"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
            required
          />

          <label>Borrower Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label>Co Borrower 1 Name:</label>
          <input
            type="text"
            value={coName}
            onChange={(e) => setCoName(e.target.value)}
            required
          />

          <label>Co Borrower 1 Address:</label>
          <input
            type="text"
            value={coAddress}
            onChange={(e) => setCoAddress(e.target.value)}
            required
          />

          <div className="form-row">
            <div className="form-group">
              <label>Current DPD:</label>
              <input
                type="number"
                value={dpd}
                onChange={(e) => setDpd(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Sanction Amount (₹):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <label>Region:</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>

          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option>Updated</option>
            <option>Missing</option>
            <option>Pending</option>
          </select>

          <div className="upload-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoanForm;
