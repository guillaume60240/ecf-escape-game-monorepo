import { Injectable } from '@nestjs/common';
import { FaqRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(private readonly reposotory: FaqRepository) {}

  async getAllFaq() {
    return await this.reposotory.getAllFaq();
  }
}
