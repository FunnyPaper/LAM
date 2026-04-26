export const AppEvents = {
    processesStarted: "processes-started"
} as const;

export type AppEvent = typeof AppEvents[keyof typeof AppEvents];