import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import AddLoanForm from "../AddLoanForm/AddLoanForm";
import axios from "axios";

const Portfolio = () => {
  const [loans, setLoans] = useState([]);
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [selectedLoanIds, setSelectedLoanIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingLoan, setEditingLoan] = useState(null);

  // Filters
  const [filterLoanType, setFilterLoanType] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAmountMin, setFilterAmountMin] = useState("");
  const [filterAmountMax, setFilterAmountMax] = useState("");
  const [filterDpdMin, setFilterDpdMin] = useState("");
  const [filterDpdMax, setFilterDpdMax] = useState("");

  useEffect(() => {
    axios
      // .get("http://localhost:8000/api/loans/")
      .get("http://54.123.45.67:8000/api/loans/")
      .then((res) => setLoans(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLoanType = filterLoanType
      ? loan.type === filterLoanType
      : true;
    const matchesRegion = filterRegion ? loan.region === filterRegion : true;
    const matchesStatus = filterStatus ? loan.status === filterStatus : true;
    const matchesAmount =
      (!filterAmountMin || loan.amount >= parseFloat(filterAmountMin)) &&
      (!filterAmountMax || loan.amount <= parseFloat(filterAmountMax));
    const matchesDpd =
      (!filterDpdMin || loan.dpd >= parseFloat(filterDpdMin)) &&
      (!filterDpdMax || loan.dpd <= parseFloat(filterDpdMax));

    return (
      matchesSearch &&
      matchesLoanType &&
      matchesRegion &&
      matchesStatus &&
      matchesAmount &&
      matchesDpd
    );
  });

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);

  const toggleLoan = (id) => {
    setSelectedLoanIds((prev) =>
      prev.includes(id) ? prev.filter((loanId) => loanId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked) => {
    const visibleIds = currentLoans.map((loan) => loan.id);
    if (checked) {
      setSelectedLoanIds((prev) => [...new Set([...prev, ...visibleIds])]);
    } else {
      setSelectedLoanIds((prev) =>
        prev.filter((id) => !visibleIds.includes(id))
      );
    }
  };

  const isPageFullySelected = currentLoans.every((loan) =>
    selectedLoanIds.includes(loan.id)
  );

  const handleAddLoan = (data, loanId = null) => {
    if (loanId) {
      // Edit mode
      axios
        // .patch(`http://localhost:8000/api/loans/${loanId}/`, data)
        .patch(`http://54.123.45.67:8000/api/loans/${loanId}/`, data)
        .then((res) => {
          setLoans((prev) =>
            prev.map((loan) => (loan.id === loanId ? res.data : loan))
          );
          setSelectedLoanIds([]);
          setEditingLoan(null);
          setShowAddLoan(false);
        })
        .catch((err) => console.error("Update loan failed", err));
    } else {
      // Create mode
      axios
        // .post("http://localhost:8000/api/loans/", data)
        .post("http://54.123.45.67:8000/api/loans/", data)
        .then((res) => {
          setLoans((prev) => [...prev, res.data]);
          setShowAddLoan(false);
        })
        .catch((err) => console.error("Add loan failed", err));
    }
  };

  const handleDelete = (id) => {
    axios
      // .delete(`http://localhost:8000/api/loans/${id}/`)
      .delete(`http://54.123.45.67:8000/api/loans/${id}/`)
      .then(() => {
        setLoans((prev) => prev.filter((loan) => loan.id !== id));
        setSelectedLoanIds([]);
      })
      .catch((err) => console.error("Delete failed", err));
  };

  const handleBulkDelete = () => {
    axios
      .post("http://54.123.45.67:8000/api/loans/bulk_delete/", {
        ids: selectedLoanIds,
      })
      // .post("http://localhost:8000/api/loans/bulk_delete/", {
      //   ids: selectedLoanIds,
      // })
      .then(() => {
        setLoans((prev) =>
          prev.filter((loan) => !selectedLoanIds.includes(loan.id))
        );
        setSelectedLoanIds([]);
      })
      .catch((err) => console.error("Bulk delete failed", err));
  };

  const selectedLoan = loans.find((l) => l.id === selectedLoanIds[0]);

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Portfolio</h2>
      </div>

      {/* Filter Row */}
      <div className="filter-row">
        <div className="filter-item">
          <label>Loan Type</label>
          <select
            value={filterLoanType}
            onChange={(e) => setFilterLoanType(e.target.value)}
          >
            <option value="">All</option>
            <option>Home Loan</option>
            <option>Car Loan</option>
            <option>Personal Loan</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Region</label>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
          >
            <option value="">All</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option>Updated</option>
            <option>Missing</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Amount (₹)</label>
          <div className="filter-range">
            <input
              type="number"
              placeholder="Min"
              value={filterAmountMin}
              onChange={(e) => setFilterAmountMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={filterAmountMax}
              onChange={(e) => setFilterAmountMax(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-item">
          <label>Current DPD</label>
          <div className="filter-range">
            <input
              type="number"
              placeholder="Min"
              value={filterDpdMin}
              onChange={(e) => setFilterDpdMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={filterDpdMax}
              onChange={(e) => setFilterDpdMax(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Search & Buttons */}
      <div className="search-controls">
        <input
          className="search-loan"
          placeholder="Search Loan Number"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="right-buttons">
          <button className="btn-outline">Select Columns ▼</button>
          <button
            className="btn-outline-morefilter"
            onClick={() => setShowAddLoan(true)}
          >
            Add Loan
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="portfolio-action-bar">
        {selectedLoanIds.length === 1 && (
          <>
            <button
              className="action-btn enabled"
              onClick={() =>
                setEditingLoan(loans.find((l) => l.id === selectedLoanIds[0]))
              }
            >
              Edit
            </button>
            <button
              className="action-btn enabled"
              onClick={() => handleDelete(selectedLoanIds[0])}
            >
              Delete
            </button>
          </>
        )}
        {selectedLoanIds.length > 1 && (
          <button className="action-btn enabled" onClick={handleBulkDelete}>
            Delete All ({selectedLoanIds.length})
          </button>
        )}
        {selectedLoanIds.length === 0 && (
          <>
            <button className="action-btn disabled" disabled>
              Edit
            </button>
            <button className="action-btn disabled" disabled>
              Delete
            </button>
          </>
        )}
        <span className="loan-count-right">
          {selectedLoanIds.length} loan
          {selectedLoanIds.length !== 1 ? "s" : ""} selected
        </span>
      </div>

      {/* Loan Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isPageFullySelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            <th>Loan No.</th>
            <th>Loan Type</th>
            <th>Borrower</th>
            <th>Borrower Address</th>
            <th>Co Borrower 1 Name</th>
            <th>Co Borrower 1 Address</th>
            <th>Current DPD</th>
            <th>Sanction Amount</th>
            <th>Region</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentLoans.map((loan) => (
            <tr key={loan.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLoanIds.includes(loan.id)}
                  onChange={() => toggleLoan(loan.id)}
                />
              </td>
              <td className="loan-link">{loan.id}</td>
              <td>{loan.type}</td>
              <td>{loan.borrower}</td>
              <td>{loan.address}</td>
              <td>{loan.coName}</td>
              <td>{loan.coAddress}</td>
              <td>{loan.dpd}</td>
              <td>{loan.amount}</td>
              <td>{loan.region}</td>
              <td>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="portfolio-footer">
        <span>
          Showing {indexOfFirstItem + 1}–
          {Math.min(indexOfLastItem, filteredLoans.length)} of{" "}
          {filteredLoans.length} results
        </span>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`pagination-btn ${
                currentPage === num ? "active-page" : ""
              }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Loan Modal */}
      {(showAddLoan || editingLoan) && (
        <AddLoanForm
          onClose={() => {
            setShowAddLoan(false);
            setEditingLoan(null);
          }}
          onSubmit={handleAddLoan}
          loan={editingLoan}
        />
      )}
    </div>
  );
};

export default Portfolio;
