// 控制画板
var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

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
    context.lineWidth = 2
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

// 橡皮擦
var eraserEnabled = false
eraser.onclick = function() {
    eraserEnabled = true
    actions.className = "actions x"
}
brush.onclick = function() {
    eraserEnabled = false
    actions.className = "actions"
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