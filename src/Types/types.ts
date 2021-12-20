import { ModuleInterface } from './Module';
import { UserInterface, UserContextInterface } from './interfaces';
import { View } from './View';

export type UserContextOrNull = UserContextInterface | null;

export interface Position {
  x: number;
  y: number;
}

export type AddModuleArgs = {
  module: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export type UpdateModuleArgs = {
  id: Number;
  module: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export type DeleteModuleArgs = {
  id: number;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export type AddViewArgs = {
  view: View;
  views: View[];
  setViews: (value: any) => void;
};

export type UpdateViewArgs = AddViewArgs & {
  id: number;
};

export type SaveUserContextAs = {
  fileName: string;
  user: UserInterface;
};