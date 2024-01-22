export const Status = {
  no_status: '未選択',
  plan_to_watch: '見たい',
  watching: '見てる',
  completed: '見た',
  on_hold: '一時中断',
  dropped: '視聴中止',
} as const;
export const Statuses = [Status.no_status, Status.plan_to_watch, Status.watching, Status.completed, Status.dropped] as const;
export type Status = (typeof Status)[keyof typeof Status];
