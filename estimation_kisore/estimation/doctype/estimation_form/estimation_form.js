// Copyright (c) 2025, kisore and contributors
// For license information, please see license.txt

frappe.ui.form.on('Estimation Form', {
    before_workflow_action: function(frm) {
            if(frm.doc.workflow_state =="Approved"){
            let dialog = new frappe.ui.Dialog({



            title: 'Project Details',
            fields: [
                {
                    label: 'Customer Name',
                    fieldname: 'customer_name',
                    fieldtype: 'Data',
                    default: frm.doc.customer_name,
                    read_only: 1
                },
                {
                    label: 'Project ID',
                    fieldname: 'project_id',
                    fieldtype: 'Data',
                    default: frm.doc.name,
                    read_only: 1
                },
                {
                    label: 'Project Name',
                    fieldname: 'project_name',
                    fieldtype: 'Data',
                    default: frm.doc.project_name ,
                    read_only: 1
                },
                {
                    label: 'Total No of Employees',
                    fieldname: 'total_employees',
                    fieldtype: 'Int',
                    default: frm.doc.total_employees ,
                    read_only: 1
                },
                {
                    label: 'Total Estimated Amount',
                    fieldname: 'total_amount',
                    fieldtype: 'Currency',
                    default: frm.doc.total_estimated_amount ,
                    read_only: 1
                }
            ],
            primary_action_label: 'Confirm',
            primary_action(values) {
                dialog.hide();
        
                frm.save('Submit');
            },
            secondary_action_label: 'Review',
            secondary_action() {
                dialog.hide();
        
            }
        });

        dialog.show();
    }}
        
       
});


frappe.ui.form.on("Details", {
    length: function (frm, cdt, cdn) {
        Childtableadding(frm, cdt, cdn);
    },
    width: function (frm, cdt, cdn) {
        Childtableadding(frm, cdt, cdn);
    },
    no_of_employees: function (frm, cdt, cdn) {
        Childtableadding(frm, cdt, cdn);
    },
    rate: function (frm, cdt, cdn) {
        Childtableadding(frm, cdt, cdn);
    },
    details_remove:function(frm){
            let total_no_of_employees = 0;
let total_estimated_amount = 0;

frm.doc.details.forEach(function(row) {
    total_no_of_employees += row.no_of_employees || 0;
    total_estimated_amount += row.estimation_details || 0;
});

frm.set_value("total_no_of_employees", total_no_of_employees);
frm.set_value("total_estimated_amount", total_estimated_amount);

}
    
});

function Childtableadding(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    let estimation_details = ((row.length * row.width) / row.no_of_employees) * row.rate;
    
    frappe.model.set_value(cdt, cdn, "estimation_details", estimation_details);

    let total_no_of_employees = 0;
let total_estimated_amount = 0;

frm.doc.details.forEach(function(row) {
    total_no_of_employees += row.no_of_employees || 0;
    total_estimated_amount += row.estimation_details || 0;
});

frm.set_value("total_no_of_employees", total_no_of_employees);
frm.set_value("total_estimated_amount", total_estimated_amount);

}

