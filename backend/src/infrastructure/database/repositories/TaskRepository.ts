import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { TaskPriority, TaskStatus } from "../../../domain/value-objects/TaskStatus";
import { TaskModel } from "../models/TaskModels";

export class TaskRepository implements ITaskRepository {
  async create(task: Task): Promise<Task> {
    const created = await TaskModel.create({
      title: task.title,
      description: task.description,
      status: task.status,
      priority:task.priority,
    });

    return new Task(
      created._id.toString(),
      created.title,
      created.description,
      created.status as TaskStatus,
      created.priority as TaskPriority,
      created.createdAt,
      created.updatedAt
    );
  }

  async findAll(): Promise<Task[]> {
    const tasks = await TaskModel.find();
    return tasks.map(
      t => new Task(
        t._id.toString(),
        t.title,
        t.description,
        t.status as TaskStatus,
        t.priority as TaskPriority,
        t.createdAt,
        t.updatedAt
      )
    );
  }

  async findById(id: string): Promise<Task | null> {
    const find = await TaskModel.findById(id);
    if (!find) return null;
    return new Task(
      find._id.toString(),
      find.title,
      find.description,
      find.status as TaskStatus,
      find.priority as TaskPriority,
      find.createdAt,
      find.updatedAt
    );
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    const updated = await TaskModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return null;
    return new Task(
      updated._id.toString(),
      updated.title,
      updated.description,
      updated.status as TaskStatus,
      updated.priority as TaskPriority,
      updated.createdAt,
      updated.updatedAt
    );
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await TaskModel.findByIdAndDelete(id);
    return !!deleted;
  }
}
