import { SetMetadata } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export const ROLES_KEY = 'roles';
export const ApiRole = (role: string) => ApiOperation({ summary: `${role} only`})
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
