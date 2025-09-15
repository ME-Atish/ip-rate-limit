import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class IpRecord {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ip: string;

  @Column({ type: 'timestamp' })
  widowStart: Date;

  @Column()
  requestCount: number;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  blockUntil: Date | null;
}
