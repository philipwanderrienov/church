package handlers

import (
	"net/http"
	"strconv"

	"church-app/internal/common/response"
	"church-app/internal/models"
	"church-app/internal/repository"

	"github.com/gin-gonic/gin"
)

// ItemHandler handles HTTP requests for item operations
// This is the service layer in our microservices architecture
// It acts as an intermediary between HTTP requests and the data repository
type ItemHandler struct {
	repo *repository.ItemRepository
}

// NewItemHandler creates a new item handler with the given repository
// This follows the dependency injection pattern for better testability
func NewItemHandler(repo *repository.ItemRepository) *ItemHandler {
	return &ItemHandler{repo: repo}
}

// GetAllItems handles GET /items
// Returns a list of all items in the system
// @Summary Get all items
// @Description Retrieve all items from the inventory
// @Tags items
// @Accept json
// @Produce json
// @Success 200 {object} models.ItemsListResponse
// @Router /items [get]
func (h *ItemHandler) GetAllItems(c *gin.Context) {
	items, err := h.repo.GetAll()
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve items", err.Error())
		return
	}
	response.Success(c, http.StatusOK, "Items retrieved successfully", gin.H{
		"data":  items,
		"total": len(items),
	})
}

// GetItemByID handles GET /items/:id
// Retrieves a single item by its ID
// @Summary Get item by ID
// @Description Retrieve a specific item by its unique identifier
// @Tags items
// @Accept json
// @Produce json
// @Param id path int true "Item ID"
// @Success 200 {object} models.ItemResponse
// @Router /items/{id} [get]
func (h *ItemHandler) GetItemByID(c *gin.Context) {
	// Parse item ID from URL path parameter
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.BadRequest(c, "Invalid item ID", err.Error())
		return
	}

	// Retrieve item from repository
	item, err := h.repo.GetByID(id)
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve item", err.Error())
		return
	}
	if item == nil {
		response.NotFound(c, "Item not found", nil)
		return
	}

	response.Success(c, http.StatusOK, "Item retrieved successfully", gin.H{
		"data": item,
	})
}

// CreateItem handles POST /items
// Creates a new item in the inventory
// @Summary Create new item
// @Description Add a new item to the inventory
// @Tags items
// @Accept json
// @Produce json
// @Param item body models.ItemRequest true "Item data"
// @Success 201 {object} models.ItemResponse
// @Router /items [post]
func (h *ItemHandler) CreateItem(c *gin.Context) {
	// Bind incoming JSON request to ItemRequest struct
	var req models.ItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", err.Error())
		return
	}

	// Convert request to Item model
	item := &models.Item{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Quantity:    req.Quantity,
		Category:    req.Category,
	}

	// Create item in repository
	created, err := h.repo.Create(item)
	if err != nil {
		response.InternalServerError(c, "Failed to create item", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Item created successfully", gin.H{
		"data": created,
	})
}

// UpdateItem handles PUT /items/:id
// Updates an existing item by its ID
// @Summary Update item
// @Description Update an existing item's information
// @Tags items
// @Accept json
// @Produce json
// @Param id path int true "Item ID"
// @Param item body models.ItemRequest true "Updated item data"
// @Success 200 {object} models.ItemResponse
// @Router /items/{id} [put]
func (h *ItemHandler) UpdateItem(c *gin.Context) {
	// Parse item ID from URL path parameter
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.BadRequest(c, "Invalid item ID", err.Error())
		return
	}

	// Bind incoming JSON request to ItemRequest struct
	var req models.ItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request body", err.Error())
		return
	}

	// Convert request to Item model
	item := &models.Item{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Quantity:    req.Quantity,
		Category:    req.Category,
	}

	// Update item in repository
	updated, err := h.repo.Update(id, item)
	if err != nil {
		response.InternalServerError(c, "Failed to update item", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Item updated successfully", gin.H{
		"data": updated,
	})
}

// DeleteItem handles DELETE /items/:id
// Removes an item from the inventory by its ID
// @Summary Delete item
// @Description Remove an item from the inventory
// @Tags items
// @Accept json
// @Produce json
// @Param id path int true "Item ID"
// @Success 200 {object} models.ItemResponse
// @Router /items/{id} [delete]
func (h *ItemHandler) DeleteItem(c *gin.Context) {
	// Parse item ID from URL path parameter
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.BadRequest(c, "Invalid item ID", err.Error())
		return
	}

	// Delete item from repository
	err = h.repo.Delete(id)
	if err != nil {
		response.InternalServerError(c, "Failed to delete item", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Item deleted successfully", nil)
}

// SearchItems handles GET /items/search
// Searches for items by name (case-insensitive)
// @Summary Search items
// @Description Search items by name (case-insensitive)
// @Tags items
// @Accept json
// @Produce json
// @Param q query string true "Search query"
// @Success 200 {object} models.ItemsListResponse
// @Router /items/search [get]
func (h *ItemHandler) SearchItems(c *gin.Context) {
	// Get query parameter from URL
	query := c.Query("q")
	if query == "" {
		response.BadRequest(c, "Search query is required", nil)
		return
	}

	// Search items in repository
	items, err := h.repo.Search(query)
	if err != nil {
		response.InternalServerError(c, "Failed to search items", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Search completed successfully", gin.H{
		"data":  items,
		"total": len(items),
	})
}

// GetItemsByCategory handles GET /items/category/:category
// Retrieves all items belonging to a specific category
// @Summary Get items by category
// @Description Retrieve all items in a specific category
// @Tags items
// @Accept json
// @Produce json
// @Param category path string true "Category name"
// @Success 200 {object} models.ItemsListResponse
// @Router /items/category/{category} [get]
func (h *ItemHandler) GetItemsByCategory(c *gin.Context) {
	// Get category from URL path parameter
	category := c.Param("category")
	if category == "" {
		response.BadRequest(c, "Category is required", nil)
		return
	}

	// Get items by category from repository
	items, err := h.repo.GetByCategory(category)
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve items", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Items retrieved successfully", gin.H{
		"data":  items,
		"total": len(items),
	})
}
