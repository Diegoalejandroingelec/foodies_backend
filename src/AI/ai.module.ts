import { Module } from '@nestjs/common';
import { ArtificialIntelligenceService } from './ai.service';


@Module({
  providers: [ArtificialIntelligenceService],
  exports: [ArtificialIntelligenceService],
})
export class ArtificialIntelligenceModule {}