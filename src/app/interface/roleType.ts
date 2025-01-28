export const USER__ROLE = {
    customer:'customer',
    admin:'admin'
} as const

export type ROLE__TYPE = keyof typeof USER__ROLE 