// 控制画板
var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var lineWidth = 3

var pageSize = function() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}
pageSize()

window.onresize = function() {
    pageSize()
}

// 控制鼠标
var using = false
var lastPoint = {x:undefined, y:undefined}

var drawLine = function(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

// 橡皮擦
var eraserEnabled = false
eraser.onclick = function() {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

pen.onclick = function() {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}


// 清空按钮
clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}


// 选择颜色
black.onclick = function() {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function() {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function() {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
yellow.onclick = function() {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function() {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}


//画笔粗细
thin.onclick = function() {
    lineWidth = 3
}
thick.onclick = function() {
    lineWidth = 6
}


// 特性检测
if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function(a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x, y, 10, 10)
        } else {
            lastPoint = {x:x, y:y}
        }
    }

    canvas.ontouchmove = function(a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        if (eraserEnabled) {
            if (using) {
                context.clearRect(x-5, y-5, 10, 10)
            }
        } else {
            if(using) {
                var newPoint = {x:x, y:y}
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }

    canvas.ontouchend = function() {
        using = false
    }
} else {
    // 非触屏设备
    canvas.onmousedown = function(a) {
        var x = a.clientX
        var y = a.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x, y, 10, 10)
        } else {
            lastPoint = {x:x, y:y}
        }
    }

    canvas.onmousemove = function(a) {
        var x = a.clientX
        var y = a.clientY
        if (eraserEnabled) {
            if (using) {
                context.clearRect(x-5, y-5, 10, 10)
            }
        } else {
            if(using) {
                var newPoint = {x:x, y:y}
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }

    canvas.onmouseup = function() {
        using = false
    }
}