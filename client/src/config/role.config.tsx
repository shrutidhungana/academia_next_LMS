// role.config.ts
export const ROLE_REDIRECT_MAP: Record<string, string> = {
  "Super-Admin": "/super-admin/dashboard",
  Admin: "/admin/dashboard",
  "Tenant-Admin": "/tenant/dashboard",
  Instructor: "/instructor/dashboard",
  Student: "/student/dashboard",
};

export const NAV_ROLE_MAP: Record<string, string> = {
  "Super-Admin": "superAdmin",
  Admin: "admin",
  "Tenant-Admin": "tenantAdmin",
  Instructor: "instructor",
  Student: "student",
};
