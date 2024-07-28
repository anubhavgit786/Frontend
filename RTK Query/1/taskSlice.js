import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "";

const api = createApi(
{
    baseQuery: fetchBaseQuery({ baseUrl : BASE_URL }),
    tagTypes: ['Tasks'],
    endpoints: (builder)=>
    ({
        getTasks: builder.query(
        {
            query: ()=> '/tasks',
            transformResponse: (tasks)=> tasks.reverse(),
            provideTags: ['Tasks'],

        }), 

        addTask: builder.mutation
        ({
            query: (task)=> ({ url: '/tasks', method: 'POST', body: task }),
            invalidateTags: ['Tasks'], // It means refetching of tasks whenever a task is added.
            async onQueryStarted(task, { dispatch, queryFulfilled})
            {
                const patchResult = dispatch(api.util.updateQueryData("getTasks", undefined, (tasks)=>
                {
                    tasks.unshift({ id: crypto.randomUUID(), ...task });
                }));

                try 
                {
                    await queryFulfilled;    
                } 
                catch 
                {
                    patchResult.undo();
                }
            }, 
        }),

        updateTask: builder.mutation
        ({
            query: (id, ...updatedTask)=> ({ url: `/tasks/${id}`, method: 'PATCH', body: updatedTask }),
            invalidateTags: ['Tasks'], // It means refetching of tasks whenever a task is updated.
            async onQueryStarted({ id, updatedTask }, { dispatch, queryFulfilled})
            {
                const patchResult = dispatch(api.util.updateQueryData("getTasks", undefined, (tasks)=>
                {
                    const taskId = tasks.findIndex(task => task.id === id);
                    if (taskId)
                    {
                        tasks[taskId] = {...tasks[taskId], ...updatedTask};
                    }
                }));

                try 
                {
                    await queryFulfilled;    
                } 
                catch 
                {
                    patchResult.undo();
                }
            },
        }),
        
        deleteTask: builder.mutation
        ({
            query: (id)=> ({ url: `/tasks/${id}`, method: 'DELETE' }),
            invalidateTags: ['Tasks'], // It means refetching of tasks whenever a task is deleted.
            async onQueryStarted(id, { dispatch, queryFulfilled})
            {
                const patchResult = dispatch(api.util.updateQueryData("getTasks", undefined, (tasks)=>
                {
                    const taskId = tasks.findIndex(task => task.id === id);
                    if (taskId)
                    {
                        tasks.splice(taskId, 1);
                    }
                }));

                try 
                {
                    await queryFulfilled;    
                } 
                catch 
                {
                    patchResult.undo();
                }
            },
        }),
    })
})

export const {  useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = api;

// const { data: tasks, isLoading, error} = useGetTasksQuery();

// const [ addTask ] = useAddTaskMutation();
// addTask(task);

// const [ updateTask ] = useUpdateTaskMutation();
// updateTask({ id, completed: !completed });    

// const [ deleteTask ] = useDeleteTaskMutation();
// deleteTask(id);



