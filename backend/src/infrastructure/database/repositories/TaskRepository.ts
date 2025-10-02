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
      dueDate:task.dueDate
    });

    return new Task(
      created._id.toString(),
      created.title,
      created.description,
      created.status as TaskStatus,
      created.priority as TaskPriority,
      created.dueDate,
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
        t.dueDate,
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
      find.dueDate,
      find.createdAt,
      find.updatedAt
    );
  }

  async update(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    const updated = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
    if (!updated) return null;
    return new Task(
      updated._id.toString(),
      updated.title,
      updated.description,
      updated.status as TaskStatus,
      updated.priority as TaskPriority,
      updated.dueDate,
      updated.createdAt,
      updated.updatedAt
    );
  }

  async delete(id: string): Promise<Task |null> {
    const deleted = await TaskModel.findByIdAndDelete(id);
    if (!deleted) return null;
    return new Task(
      deleted?._id.toString(),
      deleted.title,
      deleted.description,
      deleted.status as TaskStatus,
      deleted.priority as TaskPriority,
      deleted.dueDate,
      deleted.createdAt,
      deleted.updatedAt
    );
  }

  async findByTitle(title: string): Promise<Task[]> {
  const tasks = await TaskModel.find({ title: { $regex: title, $options: 'i' } }); 
  return tasks.map(
    t => new Task(
      t._id.toString(),
      t.title,
      t.description,
      t.status as TaskStatus,
      t.priority as TaskPriority,
      t.dueDate,
      t.createdAt,
      t.updatedAt
    )
  );
}


}
