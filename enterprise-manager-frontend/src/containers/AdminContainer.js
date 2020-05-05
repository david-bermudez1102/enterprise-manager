import React from "react";
import AdminForm from "../components/AdminForm";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { addAdmin } from "../actions/adminActions";
import { FormCard } from "../components/Cards/Cards";

const AdminContainer = ({ organizations, admins }) => {
  const dispatch = useDispatch();
  return (
    <>
      {organizations.length === 0 ? (
        <Redirect push to="/organizations/new" />
      ) : null}
      {admins.length === 0 ? (
        <div className="row d-flex h-100 align-items-center justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-6 px-0">
            <FormCard
              header={
                <h2>
                  <i className="fas fa-user-shield mr-2"></i>Create Root Admin
                </h2>
              }>
              <AdminForm
                addAdmin={admin => dispatch(addAdmin(admin))}
                organizationId={organizations[0].id}
              />
            </FormCard>
          </div>
        </div>
      ) : (
        <Redirect push to="/login" />
      )}
    </>
  );
};

export default React.memo(AdminContainer);
