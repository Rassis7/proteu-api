export const subscribers = (subscribers: any[]) => {
  subscribers.map(subscriber => {
    new subscriber.class(...subscriber.dependencies);
  });
};
