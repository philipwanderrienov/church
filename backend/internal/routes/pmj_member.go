package routes

import (
	"church-app/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterPMJMemberRoutes(router *gin.RouterGroup, handler *handlers.PMJMemberHandler) {
	route := router.Group("/pmj-members")
	{
		route.GET("", handler.GetAll)
		route.GET("/:id", handler.GetByID)
		route.POST("", handler.Create)
		route.PUT("/:id", handler.Update)
		route.DELETE("/:id", handler.Delete)
	}
}
