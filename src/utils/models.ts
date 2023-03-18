import { ColumnType } from "./enums";

export interface TaskModel {
  id: string,
  title: string,
  color: string,
  column: ColumnType,
}