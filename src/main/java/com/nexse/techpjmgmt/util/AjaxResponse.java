package com.nexse.techpjmgmt.util;

import java.util.ArrayList;
import java.util.List;

/**
 * @author : germano giudici
 */
public class AjaxResponse<T>{
    private String success = "true";
    private List<T> results = new ArrayList<T>();

    public AjaxResponse(String success) {
        this.success = success;
    }

    public AjaxResponse() {
    }

    public AjaxResponse(List<T> entries) {
        results.addAll(entries);
    }

    public void add(T entry){
        this.results.add(entry);
    }
    
    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public List<T> getResults() {
        return results;
    }
}
