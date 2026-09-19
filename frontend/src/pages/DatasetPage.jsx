import React, { useState, useMemo } from 'react';
import {
    Search,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown,
    Database,
    Filter,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

// Generates realistic sample dataset records based on 62,478 clean cardio_train.csv dataset schema
const GENERATED_DATASET = Array.from({ length: 60 }, (_, i) => {
    const id = 10001 + i;
    const ageDays = 15000 + (i * 245) % 10000;
    const ageYears = Math.round(ageDays / 365.25);
    const gender = i % 2 === 0 ? 'Male (2)' : 'Female (1)';
    const height = 155 + (i * 3) % 32;
    const weight = 55 + (i * 4) % 48;
    const ap_hi = 110 + (i * 7) % 65;
    const ap_lo = 70 + (i * 5) % 40;
    const cholesterol = (i % 3) + 1; // 1: Normal, 2: Above Normal, 3: High
    const gluc = ((i * 2) % 3) + 1;
    const smoke = i % 5 === 0 ? 1 : 0;
    const alco = i % 7 === 0 ? 1 : 0;
    const active = i % 4 === 0 ? 0 : 1;
    const cardio = (ap_hi >= 135 || cholesterol >= 2 || ageYears >= 55 || weight >= 85) ? 1 : 0;

    return {
        id: `PID-${id}`,
        ageYears,
        ageDays,
        gender,
        height,
        weight,
        ap_hi,
        ap_lo,
        cholesterol: cholesterol === 1 ? '1 (Normal)' : cholesterol === 2 ? '2 (Above)' : '3 (High)',
        gluc: gluc === 1 ? '1 (Normal)' : gluc === 2 ? '2 (Above)' : '3 (High)',
        smoke: smoke === 1 ? '1 (Yes)' : '0 (No)',
        alco: alco === 1 ? '1 (Yes)' : '0 (No)',
        active: active === 1 ? '1 (Yes)' : '0 (No)',
        cardio: cardio === 1 ? 'Class 1 (Cardio)' : 'Class 0 (Healthy)',
        cardioRaw: cardio
    };
});

export default function DatasetPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    // Total Virtual Records Count matching CardioAI clean dataset
    const TOTAL_RECORDS_COUNT = 62478;

    // Filtered dataset logic
    const filteredData = useMemo(() => {
        return GENERATED_DATASET.filter((item) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                item.id.toLowerCase().includes(searchLower) ||
                item.ageYears.toString().includes(searchLower) ||
                item.gender.toLowerCase().includes(searchLower) ||
                item.ap_hi.toString().includes(searchLower) ||
                item.ap_lo.toString().includes(searchLower) ||
                item.cholesterol.toLowerCase().includes(searchLower) ||
                item.gluc.toLowerCase().includes(searchLower) ||
                item.cardio.toLowerCase().includes(searchLower)
            );
        });
    }, [searchTerm]);

    // Sorted dataset logic
    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortField, sortOrder]);

    // Paginated rows
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    // Handle Sort Toggle
    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // Export CSV Functionality
    const exportCSV = () => {
        const headers = [
            'PATIENT ID', 'AGE (yrs)', 'GENDER', 'HEIGHT (cm)', 'WEIGHT (kg)',
            'AP_HI', 'AP_LO', 'CHOLESTEROL', 'GLUCOSE', 'SMOKE', 'ALCOHOL', 'ACTIVE', 'CARDIO TARGET'
        ];

        const rows = sortedData.map(row => [
            row.id, row.ageYears, row.gender, row.height, row.weight,
            row.ap_hi, row.ap_lo, row.cholesterol, row.gluc, row.smoke, row.alco, row.active, row.cardio
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `cardio_dataset_export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const startRecordNum = (currentPage - 1) * rowsPerPage + 1;
    const endRecordNum = Math.min(currentPage * rowsPerPage, sortedData.length);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Header Bar matching Mockup */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Historical Patient Health Dataset
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
                        Explorer view for CardioAI training dataset records & physiological health schema.
                    </p>
                </div>

                {/* Export Dataset CSV Button */}
                <button
                    onClick={exportCSV}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '11px 20px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
                        transition: 'all 0.25s ease'
                    }}
                >
                    <Download size={18} />
                    <span>Export Dataset CSV</span>
                </button>
            </div>

            {/* Control Bar: Search Input & Rows Per Page */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>

                {/* Search Bar Input */}
                <div style={{ position: 'relative', flex: 1, minWidth: '280px', maxWidth: '480px' }}>
                    <Search
                        size={18}
                        color="var(--text-muted)"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                        type="text"
                        placeholder="Search dataset (age, ap_hi, cholesterol, gluc, etc.)..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{
                            width: '100%',
                            padding: '11px 14px 11px 42px',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-main)',
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }}
                    />
                </div>

                {/* Rows Per Page Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Rows per page
                    </span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        style={{
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-main)',
                            padding: '8px 12px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

            </div>

            {/* Styled High-Contrast Dataset Table */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(0, 0, 0, 0.25)', borderBottom: '1px solid var(--border-color)' }}>
                                {[
                                    { key: 'id', label: 'PATIENT ID' },
                                    { key: 'ageYears', label: 'AGE (yrs)' },
                                    { key: 'gender', label: 'GENDER' },
                                    { key: 'height', label: 'HEIGHT (cm)' },
                                    { key: 'weight', label: 'WEIGHT (kg)' },
                                    { key: 'ap_hi', label: 'AP_HI' },
                                    { key: 'ap_lo', label: 'AP_LO' },
                                    { key: 'cholesterol', label: 'CHOLESTEROL' },
                                    { key: 'gluc', label: 'GLUCOSE' },
                                    { key: 'cardio', label: 'CARDIO TARGET' },
                                ].map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() => handleSort(col.key)}
                                        style={{
                                            padding: '14px 16px',
                                            color: 'var(--text-dim)',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.05em',
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span>{col.label}</span>
                                            <ArrowUpDown size={13} color="var(--text-dim)" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan={10} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No dataset entries found matching "{searchTerm}".
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((row, index) => {
                                    const isCardio = row.cardioRaw === 1;
                                    return (
                                        <tr
                                            key={row.id}
                                            style={{
                                                borderBottom: '1px solid var(--border-color)',
                                                background: index % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                                                transition: 'background 0.2s ease'
                                            }}
                                        >
                                            <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                                                {row.id}
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                                                {row.ageYears} yrs
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                                                {row.gender}
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                                {row.height}
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                                {row.weight}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontWeight: 700, color: row.ap_hi >= 135 ? '#f43f5e' : '#34d399', fontFamily: 'var(--font-mono)' }}>
                                                {row.ap_hi}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontWeight: 700, color: row.ap_lo >= 85 ? '#f59e0b' : '#34d399', fontFamily: 'var(--font-mono)' }}>
                                                {row.ap_lo}
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                                                {row.cholesterol}
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                                                {row.gluc}
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '4px 10px',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    background: isCardio ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                    color: isCardio ? '#f87171' : '#34d399',
                                                    border: `1px solid ${isCardio ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                                                }}>
                                                    {isCardio ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
                                                    <span>{row.cardio}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination matching Mockup */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    background: 'rgba(0, 0, 0, 0.15)',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Showing <strong style={{ color: 'var(--text-main)' }}>{startRecordNum}-{endRecordNum}</strong> of <strong style={{ color: 'var(--text-main)' }}>{TOTAL_RECORDS_COUNT.toLocaleString()}</strong> records
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                        {/* First Page */}
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            style={{
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                color: currentPage === 1 ? 'var(--text-dim)' : 'var(--text-main)',
                                padding: '6px 10px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <ChevronsLeft size={16} />
                        </button>

                        {/* Prev Page */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                color: currentPage === 1 ? 'var(--text-dim)' : 'var(--text-main)',
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <ChevronLeft size={16} />
                            <span>Prev</span>
                        </button>

                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', padding: '0 8px' }}>
                            Page {currentPage} of {totalPages || 1}
                        </span>

                        {/* Next Page */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage >= totalPages}
                            style={{
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                color: currentPage >= totalPages ? 'var(--text-dim)' : 'var(--text-main)',
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <span>Next</span>
                            <ChevronRight size={16} />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage >= totalPages}
                            style={{
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                color: currentPage >= totalPages ? 'var(--text-dim)' : 'var(--text-main)',
                                padding: '6px 10px',
                                borderRadius: 'var(--radius-sm)',
                                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <ChevronsRight size={16} />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}
