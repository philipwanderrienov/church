package routes

import (
	"church-app/internal/handlers"

	"github.com/gin-gonic/gin"
)

// RegisterWeeklyReadingRoutes wires up the weekly reading endpoints.
func RegisterWeeklyReadingRoutes(v1 *gin.RouterGroup, h *handlers.WeeklyReadingHandler) {
	weeklyReadings := v1.Group("/weekly-readings")
	{
		weeklyReadings.GET("", h.GetAllWeeklyReadings)
		weeklyReadings.GET("/:id", h.GetWeeklyReadingByID)
		weeklyReadings.POST("", h.CreateWeeklyReading)
		weeklyReadings.PUT("/:id", h.UpdateWeeklyReading)
		weeklyReadings.DELETE("/:id", h.DeleteWeeklyReading)
	}
}