package handlers

import (
	"net/http"

	"church-app/internal/common/response"
	"church-app/internal/models"
	"church-app/internal/repository"

	"github.com/gin-gonic/gin"
)

type CongregationHandler struct {
	repo *repository.CongregationRepository
}

func NewCongregationHandler(repo *repository.CongregationRepository) *CongregationHandler {
	return &CongregationHandler{repo: repo}
}

type LoginRequest struct {
	Identifier string `json:"identifier" example:"johnsihotang"`
	Password   string `json:"password" example:"password123"`
}

type LoginUserResponse struct {
	ID       string `json:"id" example:"1"`
	Name     string `json:"name" example:"John Doe"`
	Email    string `json:"email" example:"john.doe@example.com"`
	Username string `json:"username" example:"johnsihotang"`
	Role     string `json:"role" example:"jemaat"`
}

type LoginResponse struct {
	Message string             `json:"message" example:"Login successful"`
	User    LoginUserResponse  `json:"user"`
}

// Login handles POST /congregations/auth/login
// @Summary Login user
// @Description Authenticate user with email or username and password
// @Tags auth
// @Accept json
// @Produce json
// @Param credentials body LoginRequest true "Login credentials"
// @Success 200 {object} LoginResponse
// @Failure 400 {object} models.CongregationErrorResponse
// @Failure 401 {object} models.CongregationErrorResponse
// @Router /congregations/auth/login [post]
func (h *CongregationHandler) Login(c *gin.Context) {
	var req struct {
		Identifier string `json:"identifier" binding:"required"`
		Password   string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request data", err.Error())
		return
	}

	user, err := h.repo.FindByLoginIdentifier(req.Identifier)
	if err != nil {
		response.InternalServerError(c, "Failed to process login", err.Error())
		return
	}
	if user == nil {
		response.Unauthorized(c, "User not found", nil)
		return
	}

	if user.Username != req.Identifier && user.Email != req.Identifier {
		response.Unauthorized(c, "Invalid email/username", nil)
		return
	}

	if !h.repo.VerifyPassword(user.PasswordHash, req.Password) {
		response.Unauthorized(c, "Invalid password", nil)
		return
	}

	response.Success(c, http.StatusOK, "Login successful", gin.H{
		"user": gin.H{
			"id":       user.ID,
			"name":     user.FullName,
			"email":    user.Email,
			"username": user.Username,
			"role":     user.Role,
		},
	})
}

// GetAllCongregations handles GET /congregations
// Returns a list of all congregations in the system
// @Summary Get all congregations
// @Description Retrieve all congregations from the system
// @Tags congregations
// @Accept json
// @Produce json
// @Success 200 {object} models.CongregationsListResponse
// @Router /congregations [get]
func (h *CongregationHandler) GetAllCongregations(c *gin.Context) {
	congregations, err := h.repo.GetAll()
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve congregations", err.Error())
		return
	}
	response.Success(c, http.StatusOK, "Congregations retrieved successfully", gin.H{
		"data":  congregations,
		"total": len(congregations),
	})
}

// GetCongregationByID handles GET /congregations/:id
// Retrieves a single congregation by its ID
// @Summary Get congregation by ID
// @Description Retrieve a specific congregation by its unique identifier
// @Tags congregations
// @Accept json
// @Produce json
// @Param id path string true "Congregation ID"
// @Success 200 {object} models.CongregationResponse
// @Failure 404 {object} models.CongregationErrorResponse
// @Router /congregations/{id} [get]
func (h *CongregationHandler) GetCongregationByID(c *gin.Context) {
	id := c.Param("id")
	congregation, err := h.repo.GetByID(id)
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve congregation", err.Error())
		return
	}
	if congregation == nil {
		response.NotFound(c, "Congregation not found", nil)
		return
	}
	response.Success(c, http.StatusOK, "Congregation retrieved successfully", gin.H{
		"data": congregation,
	})
}

// CreateCongregation handles POST /congregations
// Creates a new congregation
// @Summary Create a new congregation
// @Description Add a new congregation to the system
// @Tags congregations
// @Accept json
// @Produce json
// @Param congregation body models.CreateCongregationRequest true "Congregation data"
// @Success 201 {object} models.CongregationResponse
// @Failure 400 {object} models.CongregationErrorResponse
// @Router /congregations [post]
func (h *CongregationHandler) CreateCongregation(c *gin.Context) {
	var req models.CreateCongregationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request data", err.Error())
		return
	}

	congregation, err := h.repo.Create(req)
	if err != nil {
		response.InternalServerError(c, "Failed to create congregation", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Congregation created successfully", gin.H{
		"data": congregation,
	})
}

// UpdateCongregation handles PUT /congregations/:id
// Updates an existing congregation
// @Summary Update a congregation
// @Description Modify the details of an existing congregation
// @Tags congregations
// @Accept json
// @Produce json
// @Param id path string true "Congregation ID"
// @Param congregation body models.UpdateCongregationRequest true "Updated congregation data"
// @Success 200 {object} models.CongregationResponse
// @Failure 400 {object} models.CongregationErrorResponse
// @Failure 404 {object} models.CongregationErrorResponse
// @Router /congregations/{id} [put]
func (h *CongregationHandler) UpdateCongregation(c *gin.Context) {
	id := c.Param("id")
	var req models.UpdateCongregationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request data", err.Error())
		return
	}

	congregation, err := h.repo.Update(id, req)
	if err != nil {
		response.InternalServerError(c, "Failed to update congregation", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Congregation updated successfully", gin.H{
		"data": congregation,
	})
}

// DeleteCongregation handles DELETE /congregations/:id
// Deletes a congregation by its ID
// @Summary Delete a congregation
// @Description Remove a congregation from the system by its unique identifier
// @Tags congregations
// @Accept json
// @Produce json
// @Param id path string true "Congregation ID"
// @Success 204 "No Content"
// @Failure 404 {object} models.CongregationErrorResponse
// @Router /congregations/{id} [delete]
func (h *CongregationHandler) DeleteCongregation(c *gin.Context) {
	id := c.Param("id")
	err := h.repo.Delete(id)
	if err != nil {
		response.InternalServerError(c, "Failed to delete congregation", err.Error())
		return
	}
	c.Status(http.StatusNoContent)
}
