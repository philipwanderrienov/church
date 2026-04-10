package handlers

import (
	"net/http"

	"church-app/internal/common/response"
	"church-app/internal/models"
	"church-app/internal/repository"

	"github.com/gin-gonic/gin"
)

type PMJMemberHandler struct {
	repo *repository.PMJMemberRepository
}

func NewPMJMemberHandler(repo *repository.PMJMemberRepository) *PMJMemberHandler {
	return &PMJMemberHandler{repo: repo}
}

func (h *PMJMemberHandler) GetAll(c *gin.Context) {
		members, err := h.repo.GetAll()
		if err != nil {
			response.Error(c, http.StatusInternalServerError, "Failed to fetch PMJ members", err.Error())
			return
		}

	response.Success(c, http.StatusOK, "PMJ members fetched successfully", gin.H{
		"data":  members,
		"total": len(members),
	})
}

func (h *PMJMemberHandler) GetByID(c *gin.Context) {
		member, err := h.repo.GetByID(c.Param("id"))
		if err != nil {
			response.Error(c, http.StatusNotFound, "PMJ member not found", err.Error())
			return
		}

	response.Success(c, http.StatusOK, "PMJ member fetched successfully", gin.H{
		"data": member,
	})
}

func (h *PMJMemberHandler) Create(c *gin.Context) {
	var req models.CreatePMJMemberRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			response.Error(c, http.StatusBadRequest, "Invalid request payload", err.Error())
			return
		}

		member, err := h.repo.Create(req)
		if err != nil {
			response.Error(c, http.StatusInternalServerError, "Failed to create PMJ member", err.Error())
			return
		}

	response.Success(c, http.StatusCreated, "PMJ member created successfully", gin.H{
		"data": member,
	})
}

func (h *PMJMemberHandler) Update(c *gin.Context) {
	var req models.UpdatePMJMemberRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			response.Error(c, http.StatusBadRequest, "Invalid request payload", err.Error())
			return
		}

		member, err := h.repo.Update(c.Param("id"), req)
		if err != nil {
			response.Error(c, http.StatusInternalServerError, "Failed to update PMJ member", err.Error())
			return
		}

	response.Success(c, http.StatusOK, "PMJ member updated successfully", gin.H{
		"data": member,
	})
}

func (h *PMJMemberHandler) Delete(c *gin.Context) {
		if err := h.repo.Delete(c.Param("id")); err != nil {
			response.Error(c, http.StatusInternalServerError, "Failed to delete PMJ member", err.Error())
			return
		}

	response.Success(c, http.StatusOK, "PMJ member deleted successfully", nil)
}
