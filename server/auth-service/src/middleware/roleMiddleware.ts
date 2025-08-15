import { Request, Response, NextFunction } from "express";

export const checkRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.roles || !roles.some((r) => user.roles.includes(r))) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};
