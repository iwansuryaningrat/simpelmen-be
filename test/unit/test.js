var condition = {};

const user_status = true;
const isAdmin = true;

if (user_status) {
  condition.user_status = user_status;
}

if (isAdmin) {
  condition.user_role = {
    isAdmin,
  };
}

console.log(condition);
