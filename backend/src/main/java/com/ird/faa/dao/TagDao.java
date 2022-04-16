package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Tag;


@Repository
public interface TagDao extends JpaRepository<Tag,Long> {




    Tag findByReference(String reference);

    int deleteByReference(String reference);



}
