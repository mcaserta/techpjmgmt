package com.nexse.techpjmgmt.controllers;

import com.nexse.techpjmgmt.domain.Developer;
import com.nexse.techpjmgmt.domain.Project;
import com.nexse.techpjmgmt.util.AjaxResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/developers")
@Controller
public class DeveloperController {


    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public
    @ResponseBody
    AjaxResponse<Developer> list(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, @RequestParam(value = "limit", required = false) Integer limit) {
        if (page != null || size != null) {
            int sizeNo = size == null ? limit : size.intValue();
            final int firstResult = page == null ? 0 : (page.intValue() - 1) * sizeNo;
            return new AjaxResponse<Developer>(Developer.findDeveloperEntries(firstResult, sizeNo));
        } else {
            return new AjaxResponse<Developer>(Developer.findAllDevelopers());
        }
    }

    @RequestMapping(value = "/destroy", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    public
    @ResponseBody
    AjaxResponse<Object> destroy(@RequestBody() Developer developer) {
        final AjaxResponse<Object> response = new AjaxResponse<Object>();
        try {
            developer.remove();
        } catch (Exception e) {
            e.printStackTrace();
            response.setSuccess("false");
        }
        return response;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    public
    @ResponseBody
    AjaxResponse<Object> update(@RequestBody() Developer developer) {
        final AjaxResponse<Object> response = new AjaxResponse<Object>();
        try {
            Developer managed =Developer.findDeveloper(developer.getId());
            BeanUtils.copyProperties(developer,managed,new String[]{"id","version","projects"});
            managed.merge();
        } catch (Exception e) {
            e.printStackTrace();
            response.setSuccess("false");
        }
        return response;
    }
    @RequestMapping(value = "/new", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    public
    @ResponseBody
    AjaxResponse<Developer> create(@RequestBody() Developer developer) {
        final AjaxResponse<Developer> response = new AjaxResponse<Developer>();
        try {
            response.add(developer.merge());
        } catch (Exception e) {
            e.printStackTrace();
            response.setSuccess("false");
        }
        return response;
    }

    @RequestMapping(value = "/destroyproject", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    public
    @ResponseBody
    AjaxResponse<Object> destroyProject(@RequestBody() Project project, @RequestParam(value = "iddev", required = true) Long idOwner) {
        final AjaxResponse<Object> response = new AjaxResponse<Object>();
        try {
            final Developer developer = Developer.findDeveloper(idOwner);
            developer.getProjects().remove(project);
            developer.merge();
        } catch (Exception e) {
            e.printStackTrace();
            response.setSuccess("false");
        }
        return response;
    }
}
