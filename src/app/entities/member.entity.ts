import { IMemberRole } from '../enums/member-role.enum';

export interface IMember {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  photoUrl: string | null;
  roles: IMemberRole[];
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
