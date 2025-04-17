export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersIntervalResponse {
  min: ProducerInterval[];
  max: ProducerInterval[];
}
