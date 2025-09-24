import { IDeleteTaskUseCase } from "../../ports/input/ITaskUseCase";
import { ITaskRepository } from "../../ports/output/ITaskRepository";

export class DeleteTask implements IDeleteTaskUseCase {
    constructor(private readonly taskRepository: ITaskRepository) {}

    async execute(id: string): Promise<boolean> {
        return this.taskRepository.delete(id);
    }
}