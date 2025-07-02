import frappe
from frappe import _

def execute(filters=None):
    if not filters:
        filters = {}

    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {"label": _("Name"), "fieldname": "name", "fieldtype": "Data"},
        {"label": _("Customer Name"), "fieldname": "customer_name", "fieldtype": "Data"},
        {"label": _("Project ID"), "fieldname": "project_id", "fieldtype": "Data"},
        {"label": _("Project Name"), "fieldname": "project_name", "fieldtype": "Data"},
        {"label": _("Excepted Start Date"), "fieldname": "excepted_start_date", "fieldtype": "Date"},
        {"label": _("Excepted End Date"), "fieldname": "excepted_end_date", "fieldtype": "Date"},
        {"label": _("Total No Of Employees"), "fieldname": "total_no_of_employees", "fieldtype": "Int"},
        {"label": _("Total Estimated Amount"), "fieldname": "total_estimated_amount", "fieldtype": "Currency"},
        {"label": _("Status"), "fieldname": "workflow_state", "fieldtype": "Data"},
        {"label": _("Created On"), "fieldname": "creation", "fieldtype": "Datetime"},
        {"label": _("Created By"), "fieldname": "owner", "fieldtype": "Data"},
    ]

def get_data(filters):
    condition = ""
    values = {}

    if filters.get("project_id"):
        condition += " AND ef.project_id = %(project_id)s"
        values["project_id"] = filters["project_id"]

    if filters.get("customer_name"):
        condition += " AND ef.customer_name LIKE %(customer_name)s"
        values["customer_name"] = f"%{filters['customer_name']}%"

    if filters.get("from_date"):
        condition += " AND ef.excepted_start_date >= %(from_date)s"
        values["from_date"] = filters["from_date"]

    if filters.get("to_date"):
        condition += " AND ef.excepted_end_date <= %(to_date)s"
        values["to_date"] = filters["to_date"]

    if filters.get("status"):
        condition += " AND ef.workflow_state = %(status)s"
        values["status"] = filters["status"]

    return frappe.db.sql(f"""
        SELECT 
            ef.name,
            ef.customer_name,
            ef.project_id,
            ef.project_name,
            ef.excepted_start_date,
            ef.excepted_end_date,
            ef.total_no_of_employees,
            ef.total_estimated_amount,
            ef.workflow_state,
            ef.creation,
            ef.owner
        FROM `tabEstimation Form` ef
        WHERE 1=1 {condition}
        ORDER BY ef.creation DESC
    """, values, as_dict=True)
