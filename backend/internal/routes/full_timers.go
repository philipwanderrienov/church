package routes

import (
	"church-app/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterFullTimerRoutes(rg *gin.RouterGroup, handler *handlers.FullTimerHandler) {
	fullTimers := rg.Group("/full-timers")
	{
		fullTimers.GET("", handler.List)
		fullTimers.GET("/:id", handler.GetByID)
		fullTimers.POST("", handler.Create)
		fullTimers.PUT("/:id", handler.Update)
		fullTimers.DELETE("/:id", handler.Delete)
	}
}
