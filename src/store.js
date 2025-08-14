import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export const POMO_TIME = 1500
export const S_BREAK = 300
export const L_BREAK = 900

const timerStore = (set) => ({
    // States
    isStarted: false,
    activeTimer: POMO_TIME,
    time: POMO_TIME,
    // Setter Functions
    setIsStarted: (newState) => set({ isStarted: newState }),
    setActiveTimer: (newState) => set({ activeTimer: newState }),
    setTime: (newState) => set({ time: newState }),
    decrementTime: () => set((store) => ({ time: store.time - 1 })),
})

const userStore = (set) => ({
    // States
    user: null,
    loginModal: false,
    // Setter Function
    setUser: (state) => set({ user: state }),
    updateUser: () => {},
    setLoginModal: (state) => set({ loginModal: state }),
})

/* New Task object sample
const newTask = {
    id: Date.now().toString(),
    title: "Sample title",
    status: "BACKLOG",
    pomo_count: 0
}
*/

const taskStore = (set) => ({
    // States
    tasks: [],
    currentTask: null,
    totalPomo: 0,
    modal: { action: null },
    // Setter Functions
    incrementTotalPomo: () =>
        set((store) => ({ totalPomo: store.totalPomo + 1 })),
    setModal: (newModal) => set({ modal: newModal }),
    setCurrentTask: (task) => set({ currentTask: task }),
    addTask: (newTask) =>
        set((store) => ({ tasks: [...store.tasks, newTask] })),
    removeTask: (taskId) =>
        set((store) => ({
            tasks: store.tasks.filter((task) => task.id !== taskId),
        })),
    editTitle: (taskId, title) =>
        set((store) => ({
            tasks: store.tasks.map((task) =>
                task.id === taskId ? { ...task, title: title } : task
            ),
        })),
    editStatus: (taskId, status) =>
        set((store) => ({
            tasks: store.tasks.map((task) =>
                task.id === taskId ? { ...task, status: status } : task
            ),
        })),
    incrementTaskPomo: (taskId) =>
        set((store) => ({
            tasks: store.tasks.map((task) =>
                task.id === taskId
                    ? { ...task, pomo_count: task.pomo_count + 1 }
                    : task
            ),
        })),
    clearAllTasks: () => set({ tasks: [] }),
    computeTimeSpent: (task) => task.pomo_count * 25 * 60, // seconds
})

export const useTimerStore = create(timerStore)
export const useTaskStore = create(
    persist(devtools(taskStore), { name: 'taskStore' })
)
export const useUserStore = create(
    persist(devtools(userStore), { name: 'userStore' })
)
