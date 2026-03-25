package routes

import (
	"church-app/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterCongregationRoutes(rg *gin.RouterGroup, handler *handlers.CongregationHandler) {
	congregationGroup := rg.Group("/congregations")
	{
		congregationGroup.GET("", handler.GetAllCongregations)
		// CRUD
		congregationGroup.GET("/:id", handler.GetCongregationByID)
		congregationGroup.POST("", handler.CreateCongregation)
		congregationGroup.PUT("/:id", handler.UpdateCongregation)
		congregationGroup.DELETE("/:id", handler.DeleteCongregation)
		// Additional routes for creating, updating, and deleting congregations can be added here
	}
}
