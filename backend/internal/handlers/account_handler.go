package handlers

import (
	"net/http"

	"church-app/internal/common/response"
	"church-app/internal/models"
	"church-app/internal/repository"

	"github.com/gin-gonic/gin"
)

type AccountHandler struct {
	repo *repository.AccountRepository
}

func NewAccountHandler(repo *repository.AccountRepository) *AccountHandler {
	return &AccountHandler{repo: repo}
}

// GetAllAccounts handles GET /accounts
// Returns a list of all accounts in the system
// @Summary Get all accounts
// @Description Retrieve all accounts from the system
// @Tags accounts
// @Accept json
// @Produce json
// @Success 200 {object} models.AccountsListResponse
// @Router /accounts [get]
func (h *AccountHandler) GetAllAccounts(c *gin.Context) {
	accounts, err := h.repo.GetAll()
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve accounts", err.Error())
		return
	}
	response.Success(c, http.StatusOK, "Accounts retrieved successfully", gin.H{
		"data":  accounts,
		"total": len(accounts),
	})
}

// GetAccountByID handles GET /accounts/:id
// Retrieves a single account by its ID
// @Summary Get account by ID
// @Description Retrieve a specific account by its unique identifier
// @Tags accounts
// @Accept json
// @Produce json
// @Param id path string true "Account ID"
// @Success 200 {object} models.AccountResponse
// @Failure 404 {object} models.ErrorResponse
// @Router /accounts/{id} [get]
func (h *AccountHandler) GetAccountByID(c *gin.Context) {
	id := c.Param("id")
	account, err := h.repo.GetByID(id)
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve account", err.Error())
		return
	}
	if account == nil {
		response.NotFound(c, "Account not found", nil)
		return
	}

	response.Success(c, http.StatusOK, "Account retrieved successfully", gin.H{
		"data": account,
	})
}

type createAccountRequest struct {
	Role string `json:"role" binding:"required,oneof=admin jemaat" example:"jemaat"`
}

func (h *AccountHandler) CreateAccount(c *gin.Context) {
	var req models.CreateAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request payload", err.Error())
		return
	}

	if req.Role != "admin" && req.Role != "jemaat" {
		response.BadRequest(c, "Invalid role value", nil)
		return
	}

	account, err := h.repo.Create(req)
	if err != nil {
		response.InternalServerError(c, "Failed to create account", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Account created successfully", gin.H{
		"data": account,
	})
}

// UpdateAccount handles PUT /accounts/:id
// Updates an existing account
// @Summary Update an account
// @Description Update an existing account by its ID
// @Tags accounts
// @Accept json
// @Produce json
// @Param id path string true "Account ID"
// @Param account body models.UpdateAccountRequest true "Updated account data"
// @Success 200 {object} models.AccountResponse
// @Failure 400 {object} models.AccountErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Router /accounts/{id} [put]
func (h *AccountHandler) UpdateAccount(c *gin.Context) {
	id := c.Param("id")
	var req models.UpdateAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request payload", err.Error())
		return
	}

	if req.Role != "" && req.Role != "admin" && req.Role != "jemaat" {
		response.BadRequest(c, "Invalid role value", nil)
		return
	}

	account, err := h.repo.Update(id, req)
	if err != nil {
		response.InternalServerError(c, "Failed to update account", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Account updated successfully", gin.H{
		"data": account,
	})
}

// DeleteAccount handles DELETE /accounts/:id
// Deletes an account by its ID
// @Summary Delete an account
// @Description Delete an account by its ID
// @Tags accounts
// @Accept json
// @Produce json
// @Param id path string true "Account ID"
// @Success 200 {object} models.AccountResponse
// @Failure 404 {object} models.AccountErrorResponse
// @Router /accounts/{id} [delete]
func (h *AccountHandler) DeleteAccount(c *gin.Context) {
	id := c.Param("id")
	err := h.repo.Delete(id)
	if err != nil {
		response.InternalServerError(c, "Failed to delete account", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Account deleted successfully", nil)
}
