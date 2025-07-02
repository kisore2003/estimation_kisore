frappe.query_reports["Estimation Report"] = {
    filters: [
        {
            "fieldname": "project_id",
            "label": "Project ID",
            "fieldtype": "Data",
            "reqd": 0
        },
        {
            "fieldname": "customer_name",
            "label": "Customer Name",
            "fieldtype": "Data",
            "reqd": 0
        },
        {
            "fieldname": "from_date",
            "label": "From Date",
            "fieldtype": "Date",
            "reqd": 0
        },
        {
            "fieldname": "to_date",
            "label": "To Date",
            "fieldtype": "Date",
            "reqd": 0
        },
        {
            "fieldname": "status",
            "label": "Status",
            "fieldtype": "Select",
            "options": ["", "Approved", "Draft", "Final Approval", "Rejected"],
            "reqd": 0
        }
    ]
};
