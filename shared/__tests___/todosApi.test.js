import { rawTodoList, mockFetch } from '../todosApi'


describe('MockFetch Tests', () => {
    afterEach(() => {
        window.localStorage.clear()
    })

    it('should fail with 400 status and log "missing route" error', async () => {
        await expect(mockFetch()).rejects.toEqual({ status: '400', data: 'Route must be specified' })
    });

    describe('When getting list of todos', () => {
        it('should return list w/ 200 status & have updated local storage', async () => {
            expect(window.localStorage.getItem('todosRecord')).toBeNull()

            const results = await mockFetch('localhost:3000/getTodos')

            expect(results.status).toEqual('200')
            expect(results.data).toEqual(rawTodoList)
            expect(window.localStorage.getItem('todosRecord')).toBeDefined()
        })
    })

    describe('When updating list of todos', () => {
        beforeEach(async () => {
            await mockFetch('localhost:3000/getTodos')
        })

        it('should return list w/ 200 status & have updated local storage', async () => {
            const newTodos =  [...rawTodoList, { id: 1, text: 'test everything', completed: false }]

            expect(window.localStorage.getItem('todosRecord')).toEqual(JSON.stringify(rawTodoList))

            const results = await mockFetch('localhost:3000/updateTodos', {
                method: 'POST',
                body: newTodos
            })

            expect(results.status).toEqual('200')
            expect(results.data).toEqual(newTodos)
            expect(window.localStorage.getItem('todosRecord')).toEqual(JSON.stringify(newTodos))
        })
    })

})
