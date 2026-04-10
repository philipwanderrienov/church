package handlers

import (
	"net/http"

	"church-app/internal/common/response"
	"church-app/internal/models"
	"church-app/internal/repository"

	"github.com/gin-gonic/gin"
)

type FullTimerHandler struct {
	repo *repository.FullTimerRepository
}

func NewFullTimerHandler(repo *repository.FullTimerRepository) *FullTimerHandler {
	return &FullTimerHandler{repo: repo}
}

func (h *FullTimerHandler) List(c *gin.Context) {
	items, err := h.repo.List()
	if err != nil {
		response.InternalServerError(c, "failed to fetch full timers", err.Error())
		return
	}
	response.Success(c, http.StatusOK, "full timers fetched successfully", gin.H{
		"data":  items,
		"total": len(items),
	})
}

func (h *FullTimerHandler) GetByID(c *gin.Context) {
	item, err := h.repo.GetByID(c.Param("id"))
	if err != nil {
		response.NotFound(c, "full timer not found", nil)
		return
	}
	response.Success(c, http.StatusOK, "full timer fetched successfully", gin.H{
		"data": item,
	})
}

func (h *FullTimerHandler) Create(c *gin.Context) {
	var req models.FullTimerCreateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request payload", err.Error())
		return
	}

	item, err := h.repo.Create(req)
	if err != nil {
		response.InternalServerError(c, "failed to create full timer", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "full timer created successfully", gin.H{
		"data": item,
	})
}

func (h *FullTimerHandler) Update(c *gin.Context) {
	var req models.FullTimerUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request payload", err.Error())
		return
	}

	item, err := h.repo.Update(c.Param("id"), req)
	if err != nil {
		response.InternalServerError(c, "failed to update full timer", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "full timer updated successfully", gin.H{
		"data": item,
	})
}

func (h *FullTimerHandler) Delete(c *gin.Context) {
	if err := h.repo.Delete(c.Param("id")); err != nil {
		response.InternalServerError(c, "failed to delete full timer", err.Error())
		return
	}

	c.Status(http.StatusNoContent)
}
