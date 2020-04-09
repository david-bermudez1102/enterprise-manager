export const menuIcons = account => [
  {
    title: "Resend Confirmation Email",
    className: "fas fa-envelope",
    action: "confirmation_email"
  },
  {
    title: account.disabled ? "Enable Account" : "Disable Account",
    className: "fas fa-power-off",
    action: "disable",
    modalTitle: account.disabled ? `Enable ${account.name}'s account?` : `Disable ${account.name}'s account?`,
    modalMessage: account.disabled
      ? "The account will gain access back."
      : "The account won't be able to access the platform and you'll be able to enable it anytime.",
    showModal: true
  },
  {
    title: account.locked ? "Unlock account" : "Account is currently unlocked",
    className: account.locked ? "fas fa-lock" : "fas fa-unlock",
    action: "unlock",
    modalTitle: `Unlock ${account.name}'s account?`,
    modalMessage: `Account password will be reset and a new email will be sent to ${account.email} create a new password.`,
    disabled: account.locked ? false : true,
    showModal: account.locked ? true : false
  },
  { title: "Edit Account", className: "fas fa-pen", action: "edit" },
  {
    title: "Delete Account",
    className: "fas fa-user-times",
    modalTitle: `Delete ${account.name}'s account?`,
    modalMessage:
      "The account will be deleted from the database, however data like the name and records created will be kept. If you'd prefer to disable this account temporarily, use the disable option.",
    action: "delete",
    showModal: true
  }
];
