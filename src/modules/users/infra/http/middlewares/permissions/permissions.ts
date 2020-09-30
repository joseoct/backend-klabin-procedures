export default function permissions(role) {
  return role === 'admin' || role === 'senior_operator';
}
