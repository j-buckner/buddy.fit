package food

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type Food struct {
	DB *sql.DB
}

type SearchRequest struct {
	Term string
}

type SearchResult struct {
	Description         string
	BrandOwner          string
	BrandedFoodCategory string
}

func (food Food) Search(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	var searchReq SearchRequest

	err := json.NewDecoder(r.Body).Decode(&searchReq)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	term := strings.ToLower(searchReq.Term)

	if len(term) < 3 {
		http.Error(w, "Search term must be at least 3 characters", http.StatusBadRequest)
		return
	}

	rows, err := food.DB.Query("select description, brand_owner, branded_food_category from branded_food bf join food on food.fdc_id = bf.fdc_id where LOWER(description) like $1 or LOWER(brand_owner) like $1 or LOWER(branded_food_category) like $1 limit 10", fmt.Sprintf("%%%s%%", term))
	if err != nil {
		fmt.Println("Err: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var results []SearchResult
	defer rows.Close()

	for rows.Next() {
		var res SearchResult
		if err := rows.Scan(&res.Description, &res.BrandOwner, &res.BrandedFoodCategory); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		results = append(results, res)
	}

	js, err := json.Marshal(results)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
