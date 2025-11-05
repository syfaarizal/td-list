class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.init();
        this.createParticles();
    }

    init() {
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        
        this.todoForm.addEventListener('submit', (e) => this.addTask(e));
        this.render();
        this.updateStats();
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 5 + 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    addTask(e) {
        e.preventDefault();
        const text = this.todoInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveToStorage();
        this.todoInput.value = '';
        this.render();
        this.updateStats();
        this.showSuccessAnimation('Task added successfully!');
        this.addRippleEffect(e.target);
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveToStorage();
        this.render();
        this.updateStats();
                
        const task = this.tasks.find(t => t.id === id);
        if (task.completed) {
            this.showSuccessAnimation('Task completed! 🎉');
        }
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        const newText = prompt('Edit task:', task.text);
        
        if (newText !== null && newText.trim() !== '') {
            this.tasks = this.tasks.map(t => 
                t.id === id ? { ...t, text: newText.trim() } : t
            );
            this.saveToStorage();
            this.render();
            this.showSuccessAnimation('Task updated!');
        }
    }

     deleteTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        taskElement.classList.add('removing');
                
        setTimeout(() => {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();
            this.showSuccessAnimation('Task deleted!');
        }, 500);
    }

    render() {
        if (this.tasks.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No tasks yet</h3>
                    <p>Add your first task to get started!</p>
                </div>
            `;
            return;
        }

        this.todoList.innerHTML = this.tasks.map(task => `
            <div class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="todo-content">
                    <div class="checkbox-wrapper">
                        <label style="display: flex; cursor: pointer;">
                            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}
                                onchange="todoApp.toggleTask(${task.id})">
                            <div class="checkbox-custom"></div>
                        </label>
                    </div>
                    <div class="todo-text">${task.text}</div>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" onclick="todoApp.editTask(${task.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="todoApp.deleteTask(${task.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    showSuccessAnimation(message) {
        const animation = document.createElement('div');
        animation.className = 'success-animation';
        animation.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        document.body.appendChild(animation);

        setTimeout(() => {
            animation.remove();
        }, 2000);
    }

    addRippleEffect(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    saveToStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
}

// Initialize the app
const todoApp = new TodoApp();

// Add some interactive touch feedback
document.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('add-btn') || e.target.classList.contains('action-btn')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.classList.contains('add-btn') || e.target.classList.contains('action-btn')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 100);
    }
});
