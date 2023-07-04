export type K = 'no_status' | 'plan_to_watch' | 'watching' | 'completed' | 'on_hold' | 'dropped';
export type T =  '未選択' | '見たい' | '見てる' | '見た' | '一時中断' | '視聴中止';
export type R = Record<K, T>;
export const kind: Readonly<R> = {
  no_status: '未選択',
  plan_to_watch: '見たい',
  watching: '見てる',
  completed: '見た',
  on_hold: '一時中断',
  dropped: '視聴中止',
} as const;
export const validate = (key: string): key is K => {
    return Object.keys(kind).includes(key);
};
